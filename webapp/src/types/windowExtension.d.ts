type ElectronEventAction = { (e: any, ...args: any): void }

interface Window {
    electronAPI: {
        cpuUsage: { (callback: ElectronEventAction): void }
    }
}