import githubLogo from "../../assets/github-logo.svg"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-sm text-gray-600">
        <span className="relative inline-flex items-center group">
          <span>SEP4 2026 - Gruppe 1</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 mt-2 w-56 -translate-x-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] leading-4 text-gray-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <span className="block text-[12px] font-semibold text-gray-800">
              Gruppemedlemmer
            </span>
            <span className="mt-2 block">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                IoT
              </span>
              <span className="block">Benjamin, Jonas og Victor</span>
            </span>
            <span className="mt-2 block">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                MAL
              </span>
              <span className="block">Frederik og Morten</span>
            </span>
            <span className="mt-2 block">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                WEB
              </span>
              <span className="block">Martin og Rasmus</span>
            </span>
          </span>
        </span>
        <a
          href="https://github.com/SEP4-DK1-2026"
          className="inline-flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubLogo} alt="GitHub" className="h-5 w-5" />
          <span>GitHub Organisation</span>
        </a>
      </div>
    </footer>
  )
}
