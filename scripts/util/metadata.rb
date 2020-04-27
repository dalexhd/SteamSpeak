require "erb"

require "ostruct"
require "toml-rb"

require_relative "metadata/release"

# Object representation of the /.meta directory
#
# This represents the /.meta directory in object form. Sub-classes represent
# each sub-component.
class Metadata
  module Template
    extend self

    def render(path, args = {})
      context = binding

      args.each do |key, value|
        context.local_variable_set("#{key}", value)
      end

      full_path = path.start_with?("/") ? path : "#{META_ROOT}/#{path}"
      body = File.read(full_path)
      renderer = ERB.new(body, nil, '-')

      renderer.result(context)
    end
  end

  class << self
    def load!(meta_dir, docs_root, guides_root, pages_root)
      metadata = load_metadata!(meta_dir)
      errors = metadata.validate_schema

      if errors.any?
        Printer.error!(
          <<~EOF
          The resulting hash from the `/.meta/**/*.toml` files failed
          validation against the following schema:

              /.meta/schema/meta.json

          The errors include:

              * #{errors[0..50].join("\n*    ")}
          EOF
        )
      end

      new(metadata, docs_root, guides_root, pages_root)
    end

    private
      def load_metadata!(meta_dir)
        metadata = {}

        contents =
          Dir.glob("#{meta_dir}/**/[^_]*.toml").collect do |file|
            begin
              Template.render(file)
            rescue Exception => e
              Printer.error!(
                <<~EOF
                The follow metadata file failed to load:

                  #{file}

                The error received was:

                  #{e.message}
                  #{e.backtrace.join("\n  ")}
                EOF
              )
            end
          end

        content = contents.join("\n")
        TomlRB.parse(content)
      end

      def validate_schema!(metadata)
        errors = metadata.validate_schema

        if errors.any?
          Printer.error!(
            <<~EOF
            The resulting hash from the `/.meta/**/*.toml` files failed
            validation against the following schema:

                /.meta/schema/meta.json

            The errors include:

                * #{errors[0..50].join("\n*    ")}
            EOF
          )
        end
      end
  end

  attr_reader :releases

  def initialize(hash, docs_root, guides_root, pages_root)
    @releases = OpenStruct.new()

    release_versions =
      hash.fetch("releases").collect do |version_string, _release_hash|
        Version.new(version_string)
      end

    hash.fetch("releases").collect do |version_string, release_hash|
      version = Version.new(version_string)

      last_version =
        release_versions.
          select { |other_version| other_version < version }.
          sort.
          last

      release_hash["version"] = version_string
      release = Release.new(release_hash, last_version)
      @releases.send("#{version_string}=", release)
    end
  end

  def latest_patch_releases
    version = Version.new("#{latest_version.major}.#{latest_version.minor}.0")

    releases_list.select do |release|
      release.version >= version
    end
  end

  def latest_release
    @latest_release ||= releases_list.last
  end

  def latest_version
    @latest_version ||= latest_release.version
  end

  def newer_releases(release)
    releases_list.select do |other_release|
      other_release > release
    end
  end

  def previous_minor_releases(release)
    releases_list.select do |other_release|
      other_release.version < release.version &&
        other_release.version.major != release.version.major &&
        other_release.version.minor != release.version.minor
    end
  end

  def releases_list
    @releases_list ||= @releases.to_h.values.sort
  end

  def relesed_versions
    releases
  end

  def to_h
    {
      releases: releases.deep_to_h
    }
  end
end
