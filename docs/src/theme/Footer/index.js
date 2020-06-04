import React from 'react';

import Link from '@docusaurus/Link';
import MailingListForm from '@site/src/components/MailingListForm';
import SVG from 'react-inlinesvg';

import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function FooterLink({ to, href, label, ...props }) {
  const toUrl = useBaseUrl(to);
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
            href
          }
        : {
            to: toUrl
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

const FooterLogo = ({ url, alt }) => (
  <SVG className="footer__logo" alt={alt} src={url} />
);

function Footer() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { footer } = themeConfig;

  const { copyright, links = [], logo = {} } = footer || {};
  const logoUrl = useBaseUrl(logo.src);

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={classnames('footer', {
        'footer--dark': footer.style === 'dark'
      })}
    >
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            <div className="col col--5 footer__col">
              <div className="margin-bottom--md">
                <h4>Subscribe to newsletter</h4>
              </div>
              <div className="margin-bottom--md">
                <MailingListForm description={false} />
              </div>
              <div>
                <a
                  href="https://twitter.com/dalexhdyt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="feather icon-twitter" alt="DalexHD's Twitter" />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="https://gitter.im/dwyl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="feather icon-message-circle"
                    alt="SteamSpeak's Chat"
                  />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="https://github.com/dalexhd/SteamSpeak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="feather icon-github"
                    alt="SteamSpeak's Github Repo"
                  />
                </a>
              </div>
            </div>
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <h4 className="footer__title">{linkItem.title}</h4>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li key={key} className="footer__item">
                          {item.html}
                        </li>
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="text--center">
            {logo && logo.src && (
              <div>
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLogoLink}
                  >
                    <FooterLogo alt={logo.alt} url={logoUrl} />
                  </a>
                ) : (
                  <FooterLogo alt={logo.alt} url={logoUrl} />
                )}
              </div>
            )}
            {copyright}
            <br />
            <small>
              <a
                href="https://github.com/dalexhd/SteamSpeak/security/policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security Policy
              </a>
              &nbsp;&bull;&nbsp;
              <a
                href="https://github.com/dalexhd/SteamSpeak/blob/master/PRIVACY.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </small>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
