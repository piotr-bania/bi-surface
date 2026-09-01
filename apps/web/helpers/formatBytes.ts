export function formatBytes(bytes: number): string {
    const gib = bytes / 1024 ** 3
    return `${gib.toFixed(2)} GiB`
}
