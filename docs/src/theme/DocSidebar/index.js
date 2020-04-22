import React, {useState} from 'react';

import Link from '@docusaurus/Link';
import SVG from 'react-inlinesvg';

import classnames from 'classnames';
import isInternalUrl from '@docusaurus/utils';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useLogo from '@theme/hooks/useLogo';

import styles from './styles.module.css';
import './styles.css';

const MOBILE_TOGGLE_SIZE = 24;

function DocSidebarItem({item, level, onItemClick, collapsible}) {
  const {items, href, label, type} = item;
  const [collapsed, setCollapsed] = useState(item.collapsed);
  const [prevCollapsedProp, setPreviousCollapsedProp] = useState(null);

  // If the collapsing state from props changed, probably a navigation event
  // occurred. Overwrite the component's collapsed state with the props'
  // collapsed value.
  if (item.collapsed !== prevCollapsedProp) {
    setPreviousCollapsedProp(item.collapsed);
    setCollapsed(item.collapsed);
  }

  switch (type) {
    case 'category':
      if (items.length == 0) {
        return false;
      }

      if(level == 1) {
        return (
          <li className={classnames('menu__list-item')} key={label}>
            <div className="title">
              {label}
            </div>
            <ul className="menu__list">
              {items.map(childItem => (
                <DocSidebarItem
                  key={childItem.label}
                  item={childItem}
                  level={level + 1}
                  onItemClick={onItemClick}
                  collapsible={collapsible}
                />
              ))}
            </ul>
          </li>
        );
      } else {
        let categoryHref = items[0].href;

        return (
          <li
            className={classnames('menu__list-item', {
              'menu__list-item--collapsed': collapsed,
            })}
            key={label}>
            <Link
              activeClassName="menu__link--active"
              className={classnames('menu__link', {
                'menu__link--sublist': collapsible,
              })}
              to={categoryHref + "/"}
              onClick={
                collapsible && categoryHref == '#!' ? () => setCollapsed(!collapsed) : undefined
              }>
              {label}
            </Link>
            <ul className="menu__list">
              {items.map(childItem => (
                <DocSidebarItem
                  key={childItem.label}
                  item={childItem}
                  level={level + 1}
                  onItemClick={onItemClick}
                  collapsible={collapsible}
                />
              ))}
            </ul>
          </li>
        );
      }

    case 'link':
    default:
      let instance = false;
      let processedLabel = label;

      if (label.includes('|')) {
        let parts = label.split('|', 2);
        processedLabel = parts[0];
        instance = parts[1];
      }
      let hidden = processedLabel == 'hidden';

      return (
        <li className={classnames('menu__list-item', (hidden && 'menu__list-item-hidden'))} key={label}>
          <Link
            className="menu__link"
            to={href + "/"}
            {...(isInternalUrl(href)
              ? {
                  activeClassName: 'menu__link--active',
                  exact: true,
                  onClick: onItemClick,
                }
              : {
                  target: '_blank',
                  rel: 'noreferrer noopener',
                })}>
            {processedLabel}
            {instance &&
              <span className="badges">
                {<span className="badge badge--secondary" title={`This plugin works on ${_.startCase(instance)} instance.`}><i className="feather icon-cpu"></i> {_.startCase(instance)}</span>}
              </span>}
          </Link>
        </li>
      );
  }
}

// Calculate the category collapsing state when a page navigation occurs.
// We want to automatically expand the categories which contains the current page.
function mutateSidebarCollapsingState(item, path) {
  const {items, href, type} = item;
  switch (type) {
    case 'category': {
      const anyChildItemsActive =
        items
          .map(childItem => mutateSidebarCollapsingState(childItem, path))
          .filter(val => val).length > 0;
      // eslint-disable-next-line no-param-reassign
      item.collapsed = !anyChildItemsActive;
      return anyChildItemsActive;
    }

    case 'link':
    default:
      return href === path;
  }
}

function DocSidebar(props) {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  const {
    siteConfig: {themeConfig: {navbar: {title} = {}}} = {},
    isClient,
  } = useDocusaurusContext();
  const {logoLink, logoLinkProps, logoImageUrl, logoAlt} = useLogo();


  const {
    docsSidebars,
    path,
    sidebar: currentSidebar,
    sidebarCollapsible,
  } = props;

  useLockBodyScroll(showResponsiveSidebar);

  if (!currentSidebar) {
    return null;
  }

  const sidebarData = docsSidebars[currentSidebar];

  if (!sidebarData) {
    throw new Error(
      `Cannot find the sidebar "${currentSidebar}" in the sidebar config!`,
    );
  }

  if (sidebarCollapsible) {
    sidebarData.forEach(sidebarItem =>
      mutateSidebarCollapsingState(sidebarItem, path),
    );
  }

  return (
    <div className={classnames('docs-sidebar', styles.sidebar)}>
      <Link className={styles.sidebarLogo} to={logoLink} {...logoLinkProps}>
        {logoImageUrl != null && (
          <SVG key={isClient} src={logoImageUrl} alt={logoAlt} />
        )}
        {title != null && <strong>{title}</strong>}
      </Link>
      <div
        className={classnames('menu', 'menu--responsive', styles.menu, {
          'menu--show': showResponsiveSidebar,
        })}>
        <button
          aria-label={showResponsiveSidebar ? 'Close Menu' : 'Open Menu'}
          className="button button--secondary button--sm menu__button"
          type="button"
          onClick={() => {
            setShowResponsiveSidebar(!showResponsiveSidebar);
          }}>
          {showResponsiveSidebar ? (
            <span
              className={classnames(
                styles.sidebarMenuIcon,
                styles.sidebarMenuCloseIcon,
              )}>
              &times;
            </span>
          ) : (
            <svg
              className={styles.sidebarMenuIcon}
              xmlns="http://www.w3.org/2000/svg"
              height={MOBILE_TOGGLE_SIZE}
              width={MOBILE_TOGGLE_SIZE}
              viewBox="0 0 32 32"
              role="img"
              focusable="false">
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          )}
        </button>
        <ul className="menu__list">
          {sidebarData.map(
            item =>
              item.items.length > 0 && (
                <DocSidebarItem
                  key={item.label}
                  item={item}
                  level={1}
                  onItemClick={() => {
                    setShowResponsiveSidebar(false);
                  }}
                  collapsible={sidebarCollapsible}
                />
              ),
          )}
        </ul>
      </div>
    </div>
  );
}

export default DocSidebar;
