import type { SystemResponse, TelemetryResponse } from "@/types/agent"

import { formatBytes } from "@/helpers/formatBytes"
import { formatDuration } from "@/helpers/formatDuration"

import Paragraph from "@/components/ui/text/Paragraph"

type SystemOverviewProps = {
    system: SystemResponse
    telemetry: TelemetryResponse | null
}

export default function System_Overview({ system, telemetry }: SystemOverviewProps) {
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

                {telemetry && <Paragraph>CPU usage: {telemetry.cpu_usage_percent}%</Paragraph>}
            </div>

            <div>
                <Paragraph>Total memory: {formatBytes(system.memory.total_bytes)}</Paragraph>

                {telemetry && (
                    <>
                        <Paragraph>
                            Used memory: {formatBytes(telemetry.memory_used_bytes)}
                        </Paragraph>

                        <Paragraph>
                            Available memory: {formatBytes(telemetry.memory_available_bytes)}
                        </Paragraph>

                        <Paragraph>Memory usage: {telemetry.memory_usage_percent}%</Paragraph>
                    </>
                )}
            </div>

            {telemetry && (
                <div>
                    <Paragraph>Uptime: {formatDuration(telemetry.uptime_seconds)}</Paragraph>
                </div>
            )}
        </div>
    )
}
