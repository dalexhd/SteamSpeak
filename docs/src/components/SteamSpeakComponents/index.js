/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

import CheckboxList from '@site/src/components/CheckboxList';
import Empty from '@site/src/components/Empty';
import Jump from '@site/src/components/Jump';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import InstanceBadge from '@site/src/components/InstanceBadge';

import _ from 'lodash';
import classnames from 'classnames';
import qs from 'qs';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import pluralize from 'pluralize';

import './styles.css';

function Component({
  description,
  instance,
  name,
  pathTemplate,
  status,
  title,
  type
}) {
  let template = pathTemplate;

  if (!template && type === 'plugin') {
    template = useBaseUrl('docs/reference/plugins/<name>');
  }

  const path = template.replace('<name>', name);

  return (
    <Link to={path} className="steamspeak-component" title={description}>
      <div className="steamspeak-component--header">
        <div className="steamspeak-component--name">{title}</div>
      </div>
      <div className="steamspeak-component--badges">
        {status === 'beta' && (
          <div>
            <Link
              to="/docs/about/guarantees/#beta"
              className="text--warning"
              title="This plugin is in beta and is not recommended for production environments. Click to learn more."
            >
              <i className="feather icon-alert-triangle" /> Beta Status
            </Link>
          </div>
        )}
        {status === 'prod-ready' && (
          <span
            className="badge badge--primary"
            title="his plugin has passed reliability standards that make it production ready. Click to learn more."
          >
            <i className="feather icon-award" /> Prod-Ready
          </span>
        )}
        <InstanceBadge className="badge badge--primary" instance={instance} />
      </div>
    </Link>
  );
}

function Components({ components, headingLevel, pathTemplate, titles }) {
  const pluginComponents = components.filter(
    (component) => component.type === 'plugin'
  );
  const HeadingTag = `h${headingLevel || 3}`;

  if (components.length > 0) {
    return (
      <>
        {pluginComponents.length > 0 ? (
          <>
            {titles && (
              <HeadingTag>
                {' '}
                {pluralize('Plugin', pluginComponents.length, true)}
              </HeadingTag>
            )}
            <div className="steamspeak-components--grid">
              {pluginComponents.map((props, idx) => (
                <Component key={idx} pathTemplate={pathTemplate} {...props} />
              ))}
            </div>
          </>
        ) : (
          ''
        )}
        <hr />
        <Jump
          to="https://github.com/dalexhd/SteamSpeak/issues/new?labels=enhancement&title=feat(new%20plugin)%3A%20%5BInsert%20your%20title%20here%5D&template=feature.md"
          target="_blank"
          rel="noopener noreferrer"
          rightIcon="plus-circle"
        >
          Request a new Plugin
        </Jump>
      </>
    );
  }
  return <Empty text="no plugins found" />;
}

function SteamSpeakComponents(props) {
  //
  // Base Variables
  //

  const { siteConfig } = useDocusaurusContext();
  const {
    metadata: { plugins }
  } = siteConfig.customFields;
  const titles = props.titles || props.titles === undefined;
  const filterColumn = props.filterColumn === true;
  const { pathTemplate } = props;
  const queryObj = props.location
    ? qs.parse(props.location.search, { ignoreQueryPrefix: true })
    : {};

  let components = [];
  if (props.plugins || props.plugins === undefined)
    components = components.concat(Object.values(plugins));
  components = components.sort((a, b) => (a.name > b.name ? 1 : -1));

  //
  // State
  //

  const [onlyAtLeastOnce] = useState(queryObj['at-least-once'] === 'true');
  const [onlyinstanceTypes, setOnlyinstanceTypes] = useState(
    new Set(queryObj['event-types'] || props.instanceTypes)
  );
  const [onlyOperatingSystems] = useState(
    new Set(queryObj['operating-systems'])
  );
  const [onlyProductionReady] = useState(queryObj['prod-ready'] === 'true');
  const [onlyProviders] = useState(new Set(queryObj.providers));
  const [searchTerm, setSearchTerm] = useState(queryObj.search);

  //
  // State Filtering
  //

  if (searchTerm) {
    components = components.filter((component) => {
      const fullName = `${component.name.toLowerCase()} ${component.type.toLowerCase()}`;
      return fullName.includes(searchTerm.toLowerCase());
    });
  }

  if (onlyAtLeastOnce) {
    components = components.filter(
      (component) => component.deliveryguarantee === 'at_least_once'
    );
  }

  if (onlyinstanceTypes.size > 0) {
    components = components.filter((component) =>
      Array.from(onlyinstanceTypes).every((x) => component.instance === x)
    );
  }

  if (onlyOperatingSystems.size > 0) {
    components = components.filter((component) =>
      Array.from(onlyOperatingSystems).every((x) =>
        component.operating_systems.includes(x)
      )
    );
  }

  if (onlyProductionReady) {
    components = components.filter(
      (component) => component.status === 'prod-ready'
    );
  }

  if (onlyProviders.size > 0) {
    components = components.filter((component) =>
      Array.from(onlyProviders).every(
        (x) =>
          component.service_providers && component.service_providers.includes(x)
      )
    );
  }

  //
  // Prop Filtering
  //

  if (props.exceptNames && props.exceptNames.length > 0) {
    components = components.filter(
      (component) => !props.exceptNames.includes(component.name)
    );
  }

  //
  // Filter options
  //
  const instanceTypes =
    onlyinstanceTypes.size > 0
      ? onlyinstanceTypes
      : new Set(
          _(components)
            .map((component) => component.instance)
            .flatten()
            .uniq()
            .compact()
            .sort()
            .value()
        );

  //
  // Rendering
  //

  return (
    <div
      className={classnames('steamspeak-components', {
        'steamspeak-components--cols': filterColumn
      })}
    >
      <div className="filters">
        <div className="search">
          <input
            className="input--text input--lg"
            type="text"
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            placeholder="🔍 Search..."
          />
        </div>
        <div className="filter">
          <div className="filter--label">
            <Link
              to={useBaseUrl('/docs/about/what-is-steamspeak')}
              title="Learn more about SteamSpeak's instance types"
            >
              Instance names <i className="feather icon-info" />
            </Link>
          </div>
          <div className="filter--choices">
            <CheckboxList
              label="Event Types"
              icon="cpu"
              values={instanceTypes}
              humanize
              currentState={onlyinstanceTypes}
              setState={setOnlyinstanceTypes}
            />
          </div>
        </div>
      </div>
      <div className="steamspeak-components--results">
        <Components
          components={components}
          headingLevel={props.headingLevel}
          pathTemplate={pathTemplate}
          titles={titles}
        />
      </div>
    </div>
  );
}

export default SteamSpeakComponents;
