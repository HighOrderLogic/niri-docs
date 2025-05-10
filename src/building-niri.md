# Building Niri

First, install the dependencies for your distribution.

::: code-group

```sh [Ubuntu 24.04]
$ sudo apt-get install -y gcc clang libudev-dev libgbm-dev libxkbcommon-dev libegl1-mesa-dev libwayland-dev libinput-dev libdbus-1-dev libsystemd-dev libseat-dev libpipewire-0.3-dev libpango1.0-dev libdisplay-info-dev
```

```sh [Fedora]
$ sudo dnf install gcc libudev-devel libgbm-devel libxkbcommon-devel wayland-devel libinput-devel dbus-devel systemd-devel libseat-devel pipewire-devel pango-devel cairo-gobject-devel clang libdisplay-info-devel
```

:::

Next, get latest stable Rust: https://rustup.rs/

Then, build niri with `cargo build --release`.

Check Cargo.toml for a list of build features.
For example, you can replace systemd integration with dinit integration using `cargo build --release --no-default-features --features dinit,dbus,xdp-gnome-screencast`.

::: warning

Do NOT build with `--all-features`!

Some features are meant only for development use.
For example, one of the features enables collection of profiling data into a memory buffer that will grow indefinitely until you run out of memory.

:::

## NixOS/Nix

We have a community-maintained flake which provides a devshell with required dependencies. Use `nix build` to build niri, and then run `./results/bin/niri`.

If you're not on NixOS, you may need [NixGL](https://github.com/nix-community/nixGL) to run the resulting binary:

```sh
nix run --impure github:guibou/nixGL -- ./results/bin/niri
```

## Manual Installation

If installing directly without a package, the recommended file destinations are slightly different.
In this case, put the files in the directories indicated in the table below.
These may vary depending on your distribution.

Don't forget to make sure that the path to `niri` in niri.service is correct.
This defaults to `/usr/bin/niri`.

| File | Destination |
| ---- | ----------- |
| `target/release/niri` | `/usr/local/bin/` |
| `resources/niri-session` | `/usr/local/bin/` |
| `resources/niri.desktop`  | `/usr/local/share/wayland-sessions/` |
| `resources/niri-portals.conf` | `/usr/local/share/xdg-desktop-portal/` |
| `resources/niri.service` (systemd) | `/etc/systemd/user/` |
| `resources/niri-shutdown.target` (systemd) | `/etc/systemd/user/` |
| `resources/dinit/niri` (dinit) | `/etc/dinit.d/user/` |
| `resources/dinit/niri-shutdown` (dinit) | `/etc/dinit.d/user/` |