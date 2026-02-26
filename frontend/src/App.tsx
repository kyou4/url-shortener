import { useState } from 'react'

export default function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    setError('')
    setShortUrl('')

    try {
      const response = await fetch('https://backend-urlshortener.vercel.app/urlgenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      })

      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await response.json()
      console.log(data)
      setShortUrl(data.shortUrl)
      setUrl('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-5">
            <svg
              className="w-7 h-7 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            URL Shortener
          </h1>
          <p className="text-neutral-500 text-sm">
            Transform long URLs into short, shareable links
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-5 py-4 text-sm text-white bg-black border border-neutral-800 rounded-xl outline-none transition-all duration-200 placeholder-neutral-600 focus:border-neutral-600 focus:ring-4 focus:ring-white/5 disabled:opacity-50"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className={`w-full py-4 px-6 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  isLoading || !url.trim()
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-neutral-200 cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Shortening...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Shorten URL
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-5 px-4 py-3 bg-white/5 border border-neutral-800 rounded-xl flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span className="text-neutral-400 text-sm">{error}</span>
            </div>
          )}

          {/* Success Result */}
          {shortUrl && (
            <div className="mt-6 p-5 bg-white/5 border border-neutral-800 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="text-white text-sm font-medium">
                  Link created successfully!
                </span>
              </div>

              <div className="flex items-center gap-3 bg-black p-3 rounded-xl border border-neutral-800">
                <span className="flex-1 text-neutral-300 text-sm font-mono break-all">
                  {shortUrl}
                </span>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                    copied
                      ? 'bg-white text-black'
                      : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs text-neutral-600">
          Fast, secure, and free URL shortening
        </p>
      </div>
    </div>
  )
}