module.exports = {
  docs: [
    {
      type: 'category',
      label: 'About',
      items: ['about/what-is-steamspeak', 'about/contributing']
    },
    {
      type: 'category',
      label: 'Setup',
      items: [
        'setup/installation',
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'setup/configuration',
            'setup/configuration/bot',
            'setup/configuration/website'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guide/preparing-for-production', 'guide/running-steamspeak']
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference',
        {
          type: 'category',
          label: 'Plugins',
          items: [
            'reference/plugins',
            'reference/plugins/host-message',
            'reference/plugins/multi-function',
            'reference/plugins/server-name',
            'reference/plugins/afk-kick',
            'reference/plugins/afk-move',
            'reference/plugins/change-channel'
          ]
        }
      ]
    }
  ]
};
