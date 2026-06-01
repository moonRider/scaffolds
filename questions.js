export default [
  {
    message: 'What type of project?',
    choices: [
      {
        value: 'nextjs',
        title: 'Nextjs'
      },
      {
        value: 'bun-server',
        title: 'Bun Server'
      },
      {
        value: 'ctv-tool',
        title: 'ctv component',
      }
    ]
  },
  {
    message: 'Which package manager do you want to use?',
    choices: [
      {
        value: 'pnpm',
        title: 'pnpm'
      },
      {
        value: 'yarn',
        title: 'yarn'
      },
      {
        value: 'bun',
        title: 'bun'
      },
      {
        value: 'npm',
        title: 'npm'
      }
    ]
  }
]
