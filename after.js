const packageManagers = ['pnpm', 'yarn', 'bun', 'npm']

function selectedPackageManager(features) {
  return packageManagers.find(packageManager => features.includes(packageManager))
}

function installCommand(packageManager) {
  return packageManager === 'npm'
    ? 'npm install'
    : `${packageManager} install`
}

export default async function ({
  unattended,
  here,
  prompts,
  run,
  properties,
  features = [],
  ansiColors,
}) {
  const c = ansiColors
  const packageManager = selectedPackageManager(features) || 'pnpm'
  let shouldInstall = false

  if (!unattended) {
    shouldInstall = await prompts.select({
      message: '是否需要现在安装依赖？',
      choices: [
        { title: '否' },
        {
          value: true,
          title: `是，使用 ${packageManager}`,
        },
      ],
    })
  }

  await run('git', ['init', '-b', 'main'])
  await run('chmod', ['+x', '.husky/pre-commit', '.husky/commit-msg'])

  if (shouldInstall) {
    await run(packageManager, ['install'])
  }

  console.log(`\n${c.green('项目已初始化完成，按以下步骤开始：')}`)

  if (!here) {
    console.log(`  cd ${properties.name}`)
  }

  if (!shouldInstall) {
    console.log(`  ${installCommand(packageManager)}`)
  }

  console.log(`  ${packageManager} run dev`)
}
