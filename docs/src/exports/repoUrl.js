import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const repoUrl = (url = '') => {
  const {siteConfig} = useDocusaurusContext();
  const githubHost = siteConfig.githubHost || 'github.com';
  let _ulr = url.charAt(0) === '/' ? url.substr(1) : url;

  return `https://${githubHost}/${siteConfig.organizationName}/${siteConfig.projectName}/${_ulr}`
}
