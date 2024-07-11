# INSTALACION DEL ENTORNO NESTJS


1. Use sudo to Install Globally
If you have administrative access, you can use sudo to install the package globally:


```sh
sudo npm install -g @nestjs/cli
```

2. Change npm's Default Directory
You can configure npm to use a different directory for global installations. This avoids the need for sudo and can be done by following these steps:

    Make a Directory for Global Packages:

```sh
mkdir "${HOME}/.npm-global"
```
Configure npm to Use the New Directory:

```sh
npm config set prefix "${HOME}/.npm-global"
```
Update Your PATH:

Add the following line to your ~/.profile, ~/.bashrc, or ~/.zshrc file:

```sh
Copiar código
export PATH="${HOME}/.npm-global/bin:${PATH}"
```
Then, reload your shell configuration:

```sh
source ~/.profile
```
Install the Package Globally:

```sh
npm install -g @nestjs/cli
```
