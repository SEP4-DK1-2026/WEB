import githubLogo from "../../assets/github-logo.svg"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-sm text-gray-600">
        <span>SEP4 2026 - Gruppe 1</span>
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
