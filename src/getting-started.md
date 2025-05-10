# Getting Started

The easiest way to get niri is to install one of the distribution packages.
Here are some of them: [Fedora COPR](https://copr.fedorainfracloud.org/coprs/yalter/niri/) and [nightly COPR](https://copr.fedorainfracloud.org/coprs/yalter/niri-git/) (which I maintain myself), [NixOS Flake](https://github.com/sodiboo/niri-flake), and some more from repology below.
See the [Building](#building) section if you'd like to compile niri yourself and the [Packaging niri](./packaging-niri) page if you want to package niri.

[![Packaging status](https://repology.org/badge/vertical-allrepos/niri.svg)](https://repology.org/project/niri/versions)

After installing, start niri from your display manager like GDM.
Press <kbd>Super</kbd><kbd>T</kbd> to run a terminal ([Alacritty]) and <kbd>Super</kbd><kbd>D</kbd> to run an application launcher ([fuzzel]).
To exit niri, press <kbd>Super</kbd><kbd>Shift</kbd><kbd>E</kbd>.

If you're not using a display manager, you should run `niri-session` (systemd/dinit) or `niri --session` (others) from a TTY.
The `--session` flag will make niri import its environment variables globally into the system manager and D-Bus, and start its D-Bus services.
The `niri-session` script will additionally start niri as a systemd/dinit service, which starts up a graphical session target required by some services like portals.

You can also run `niri` inside an existing desktop session.
Then it will open as a window, where you can give it a try.
Note that this windowed mode is mainly meant for development, so it is a bit buggy (in particular, there are issues with hotkeys).

Next, see the [list of important software](./important-software) required for normal desktop use, like a notification daemon and portals.
Also, check the [configuration introduction](./introduction) page to get started configuring niri.
There you can find links to other pages containing thorough documentation and examples for all options.
Finally, the [Xwayland](./xwayland) page explains how to run X11 applications on niri.

### NVIDIA

NVIDIA GPUs can have problems running niri (for example, the screen remains black upon starting from a TTY).
Sometimes, the problems can be fixed.
You can try the following:

1. Update NVIDIA drivers. You need a GPU and drivers recent enough to support GBM.
2. Make sure kernel modesetting is enabled. This usually involves adding `nvidia-drm.modeset=1` to the kernel command line. Find and follow a guide for your distribution. Guides from other Wayland compositors can help.

### Asahi, ARM, and other kmsro devices

On some of these systems, niri fails to correctly detect the primary render device.
If you're getting a black screen when starting niri on a TTY, you can try to set the device manually.

First, find which devices you have:

```sh
$ ls -l /dev/dri/
drwxr-xr-x@       - root 14 мая 07:07 by-path
crw-rw----@   226,0 root 14 мая 07:07 card0
crw-rw----@   226,1 root 14 мая 07:07 card1
crw-rw-rw-@ 226,128 root 14 мая 07:07 renderD128
crw-rw-rw-@ 226,129 root 14 мая 07:07 renderD129
```

You will likely have one `render` device and two `card` devices.

Open the niri config file at `~/.config/niri/config.kdl` and put your `render` device path like this:

```kdl
debug {
    render-drm-device "/dev/dri/renderD128"
}
```

Save, then try to start niri again.
If you still get a black screen, try using each of the `card` devices.

### Nix/NixOS

There's a common problem of mesa drivers going out of sync with niri, so make sure your system mesa version matches the niri mesa version.
When this happens, you usually see a black screen when trying to start niri from a TTY.

Also, on Intel graphics, you may need a workaround described [here](https://nixos.wiki/wiki/Intel_Graphics).

### Virtual Machines

To run niri in a VM, make sure to enable 3D acceleration.

[Alacritty]: https://github.com/alacritty/alacritty
[fuzzel]: https://codeberg.org/dnkl/fuzzel