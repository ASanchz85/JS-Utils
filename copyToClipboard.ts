export default async function handleCopyToClipboard(nameToCopy: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(nameToCopy)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
  }
}
