export default function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  const kb = Number((bytes / 1024).toFixed(2))
  if (kb < 1024) {
    return `${kb} KB`
  }
  return `${(kb / 1024).toFixed(2)} MB`
}
