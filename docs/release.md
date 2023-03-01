# Release process

Steps to take when releasing new module versions.

## Version bump

Check out the `master` branch and `git pull` so you have the latest.

To bump all packages:

```shell
npm version patch --workspace=packages # Or minor, major, etc.
```

Then bump the repo package:

```shell
npm version patch # Or minor, major, etc.
```

Push the changes to `master`.

## Create a GitHub release

Create a Github release using the newly created tag, and a github action will run to deploy all the packages.
