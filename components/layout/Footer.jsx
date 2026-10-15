import AndroidIcon from "@/components/ui/AndroidIcon";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-bark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Logo variant="onDark" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Mobile App</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="#app" className="inline-flex items-center gap-2 hover:text-white">
                <AndroidIcon size={15} /> Download APK (Android)
              </a>
            </li>
            <li className="text-xs text-white/50">APK coming soon.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-white/60 sm:px-8">
          <span>© {year} Mob&apos;in. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
