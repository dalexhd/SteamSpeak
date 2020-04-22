import React, {useState} from 'react';

import CheckboxList from '@site/src/components/CheckboxList';
import Empty from '@site/src/components/Empty';
import Jump from '@site/src/components/Jump';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import _ from 'lodash';
import classnames from 'classnames';
import qs from 'qs';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import pluralize from 'pluralize';


import './styles.css';

function Component({delivery_guarantee, description, instance, logo_path, name, pathTemplate, status, title, type}) {
  const {siteConfig} = useDocusaurusContext();
  let template = pathTemplate;

  if (!template) {
    if(type == "plugin") template = useBaseUrl('docs/reference/plugins/<name>/');
  }

  let path = template.replace('<name>', name);

  return (
    <Link to={path} className="steamspeak-component" title={description}>
      <div className="steamspeak-component--header">
        <div className="steamspeak-component--name">
          {title}
        </div>
      </div>
      <div className="steamspeak-component--badges">
        {status == "beta" &&
          <div>
            <Link to="/docs/about/guarantees/#beta" className="text--warning" title="This plugin is in beta and is not recommended for production environments. Click to learn more.">
              <i className="feather icon-alert-triangle"></i> Beta Status
            </Link>
          </div>}
        {status == "prod-ready" &&
          <span className="badge badge--primary" title="his plugin has passed reliability standards that make it production ready. Click to learn more."><i className="feather icon-award"></i> Prod-Ready</span>
          }
        {instance === "first-instance" &&
          <span className="badge badge--primary" title="This plugin works with first instance"><i className="feather icon-cpu"></i> 1</span>
          }
        {instance === "second-instance" ?
          <span className="badge badge--primary" title="This plugin works with first instance"><i className="feather icon-cpu"></i> 2</span> :
          ''}
      </div>
    </Link>
  );
}

function Components({components, headingLevel, pathTemplate, titles}) {
  const pluginComponents = components.filter(component => component.type == "plugin");
  const transformComponents = components.filter(component => component.type == "transform");
  const sinkComponents = components.filter(component => component.type == "sink");
  const HeadingTag = `h${headingLevel || 3}`;

  if (components.length > 0) {
    return (
      <>
        {pluginComponents.length > 0 ?
          <>
            {titles && <HeadingTag> {pluralize('Plugin', pluginComponents.length, true)}</HeadingTag>}
            <div className="steamspeak-components--grid">
              {pluginComponents.map((props, idx) => (
                <Component key={idx} pathTemplate={pathTemplate} {...props} />
              ))}
            </div>
          </>:
          ''}
        <hr />
        <Jump
          to="https://github.com/dalexhd/steamspeak/issues/new?labels=type%3A+new+feature"
          target="_blank"
          rightIcon="plus-circle">
          Request a new Plugin
        </Jump>
      </>
    );
  } else {
    return (
      <Empty text="no plugins found" />
    );
  }
}

function SteamSpeakComponents(props) {
  //
  // Base Variables
  //

  const {siteConfig} = useDocusaurusContext();
  const {metadata: {plugins}} = siteConfig.customFields;
  const titles = props.titles || props.titles == undefined;
  const filterColumn = props.filterColumn == true;
  const pathTemplate = props.pathTemplate;
  const queryObj = props.location ? qs.parse(props.location.search, {ignoreQueryPrefix: true}) : {};

  let components = [];
  if (props.plugins || props.plugins == undefined) components = components.concat(Object.values(plugins));
  components = components.sort((a, b) => (a.name > b.name) ? 1 : -1);

  //
  // State
  //

  const [onlyAtLeastOnce, setOnlyAtLeastOnce] = useState(queryObj['at-least-once'] == 'true');
  const [onlyinstanceTypes, setOnlyinstanceTypes] = useState(new Set(queryObj['event-types'] || props.instanceTypes));
  const [onlyFunctions, setOnlyFunctions] = useState(new Set(queryObj['functions']));
  const [onlyOperatingSystems, setOnlyOperatingSystems] = useState(new Set(queryObj['operating-systems']));
  const [onlyProductionReady, setOnlyProductionReady] = useState(queryObj['prod-ready'] == 'true');
  const [onlyProviders, setOnlyProviders] = useState(new Set(queryObj['providers']));
  const [searchTerm, setSearchTerm] = useState(queryObj['search']);

  //
  // State Filtering
  //

  if (searchTerm) {
    components = components.filter(component => {
      let fullName = `${component.name.toLowerCase()} ${component.type.toLowerCase()}`;
      return fullName.includes(searchTerm.toLowerCase())
    });
  }

  if (onlyAtLeastOnce) {
    components = components.filter(component => component.delivery_guarantee == "at_least_once");
  }

  if (onlyinstanceTypes.size > 0) {
    components = components.filter(component => Array.from(onlyinstanceTypes).map(x => component.instance === x));
  }

  if (onlyOperatingSystems.size > 0) {
    components = components.filter(component => Array.from(onlyOperatingSystems).every(x => component.operating_systems.includes(x)));
  }

  if (onlyProductionReady) {
    components = components.filter(component => component.status == "prod-ready");
  }

  if (onlyProviders.size > 0) {
    components = components.filter(component => Array.from(onlyProviders).every(x => component.service_providers && component.service_providers.includes(x)));
  }

  //
  // Prop Filtering
  //

  if (props.exceptNames && props.exceptNames.length > 0) {
    components = components.filter(component => !props.exceptNames.includes(component.name) );
  }

  //
  // Filter options
  //
  const instanceTypes = onlyinstanceTypes.size > 0 ?
    onlyinstanceTypes :
    new Set(
      _(components).
        map(component => component.instance).
        flatten().
        uniq().
        compact().
        sort().
        value()
    );


  //
  // Rendering
  //

  return (
    <div className={classnames('steamspeak-components', {'steamspeak-components--cols': filterColumn})}>
      <div className="filters">
        <div className="search">
          <input
            className="input--text input--lg"
            type="text"
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            placeholder="🔍 Search..." />
        </div>
        <div className="filter">
          <div className="filter--label">
            <Link to={useBaseUrl('/docs/about/instances/')} title="Learn more about SteamSpeak's instance types">
              Instance names <i className="feather icon-info"></i>
            </Link>
          </div>
          <div className="filter--choices">
            <CheckboxList
              label="Event Types"
              icon="cpu"
              values={instanceTypes}
              humanize={true}
              currentState={onlyinstanceTypes}
              setState={setOnlyinstanceTypes} />
          </div>
        </div>
      </div>
      <div className="steamspeak-components--results">
        <Components
          components={components}
          headingLevel={props.headingLevel}
          pathTemplate={pathTemplate}
          titles={titles} />
      </div>
    </div>
  );
}

export default SteamSpeakComponents;
