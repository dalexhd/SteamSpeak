import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// There is a default export.
export default (url = '') => {
  const { siteConfig } = useDocusaurusContext();
  const githubHost = siteConfig.githubHost || 'github.com';
  const _ulr = url.charAt(0) === '/' ? url.substr(1) : url;

  return `https://${githubHost}/${siteConfig.organizationName}/${siteConfig.projectName}/${_ulr}`;
};
