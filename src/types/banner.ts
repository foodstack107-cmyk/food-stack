export interface BannerSettings {
  showBanner: boolean;
  bannerColor: string;
  message: string;
  buttonLabel?: string;
  link?: string;
  openInNewTab: boolean;
  visibilityOption: 'home' | 'all';
}

export type ColorOption = {
  id: string;
  color: string;
  name: string;
};
