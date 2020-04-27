#!/usr/bin/env ruby

# generate.rb
#
# SUMMARY
#
#   A simple script that generates files across the SteamSpeak repo. This is used
#   for documentation, config examples, etc. The source templates are located
#   in /scripts/generate/templates/* and the results are placed in their
#   respective root directories.
#
#   See the README.md in the generate folder for more details.

#
# Setup
#

require 'etc'
require 'uri'
require_relative "setup"

Printer.title("Generating files...")

#
# Setup
#

metadata = Metadata.load!(META_ROOT, DOCS_ROOT, GUIDES_ROOT, PAGES_ROOT)

result = metadata.deep_to_h.to_json
File.open('commits.json', 'w+') do |file|
  file.write(result)
end
