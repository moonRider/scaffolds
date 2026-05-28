import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import sortPackageJson from 'sort-package-json'

const packageManagers = ['pnpm', 'yarn', 'bun', 'npm']

function selectedPackageManager(features) {
  return packageManagers.find(packageManager => features.includes(packageManager))
}

function installCommand(packageManager) {
  return packageManager === 'npm'
    ? 'npm install'
    : `${packageManager} install`
}

async function sortProjectPackageJson({ here, name }) {
  const projectPath = here ? process.cwd() : join(process.cwd(), name)
  const packageJsonPath = join(projectPath, 'package.json')
  const packageJson = await readFile(packageJsonPath, 'utf8')
  const sortedPackageJson = sortPackageJson(packageJson)

  await writeFile(
    packageJsonPath,
    sortedPackageJson.endsWith('\n') ? sortedPackageJson : `${sortedPackageJson}\n`,
  )
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
  await sortProjectPackageJson({ here, name: properties.name })

  if (shouldInstall) {
    await run(packageManager, ['install'])
  }

  console.log(c.cyan(`[makes] Project ${properties.name} has been initialized.`))
  console.log(c.cyan('follow next steps to get started.'))

  if (!here) {
    console.log(`  cd ${properties.name}`)
  }

  if (!shouldInstall) {
    console.log(`  ${installCommand(packageManager)}`)
  }

  console.log(`  ${packageManager} run dev`)
}
