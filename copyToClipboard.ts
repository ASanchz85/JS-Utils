export default function handleCopyToClipboard(nameToCopy: string | null ) {
  if (!nameToCopy) return

  navigator.clipboard.writeText(nameToCopy)
}
