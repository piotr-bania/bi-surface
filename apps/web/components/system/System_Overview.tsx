import type { SystemResponse } from "@/types/agent"
import { formatBytes } from "@/helpers/formatBytes"
import { formatDuration } from "@/helpers/formatDuration"

import Paragraph from "@/components/ui/text/Paragraph"

type SystemOverviewProps = {
    system: SystemResponse
}

export default function System_Overview({ system }: SystemOverviewProps) {
    return (
        <div className="flex flex-col gap-3">
            <div>
                <Paragraph>Hostname: {system.hostname}</Paragraph>

                <Paragraph>
                    Operating system: {system.operating_system.name}{" "}
                    {system.operating_system.release}
                </Paragraph>

                <Paragraph>OS version: {system.operating_system.version}</Paragraph>

                <Paragraph>Architecture: {system.operating_system.architecture}</Paragraph>
            </div>

            <div>
                <Paragraph>Processor: {system.cpu.name}</Paragraph>

                <Paragraph>Physical cores: {system.cpu.physical_cores}</Paragraph>

                <Paragraph>Logical cores: {system.cpu.logical_cores}</Paragraph>

                <Paragraph>CPU usage: {system.cpu.usage_percent}%</Paragraph>
            </div>

            <div>
                <Paragraph>Total memory: {formatBytes(system.memory.total_bytes)}</Paragraph>

                <Paragraph>Used memory: {formatBytes(system.memory.used_bytes)}</Paragraph>

                <Paragraph>
                    Available memory: {formatBytes(system.memory.available_bytes)}
                </Paragraph>

                <Paragraph>Memory usage: {system.memory.usage_percent}%</Paragraph>
            </div>

            <div>
                <Paragraph>Uptime: {formatDuration(system.uptime_seconds)}</Paragraph>
            </div>
        </div>
    )
}
