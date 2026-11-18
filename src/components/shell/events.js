// Cross-component UI events (palette, mobile nav). Avoids a context provider around server pages.
export const OPEN_PALETTE = "iprep:open-palette";
export const OPEN_NAV = "iprep:open-nav";

export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE));
export const openNav = () => window.dispatchEvent(new Event(OPEN_NAV));
