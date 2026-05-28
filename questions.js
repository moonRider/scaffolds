export default [
  {
    message: 'What type of project?',
    choices: [
      {
        value: 'nextjs',
        title: 'Nextjs'
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
