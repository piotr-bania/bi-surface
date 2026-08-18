"use client"

import type { SystemResponse, TelemetryResponse } from "@/types/agent"

import { formatBytes } from "@/helpers/formatBytes"
import { useLanguage } from "@/i18n/Language_Context"
import { formatDuration } from "@/helpers/formatDuration"

import Paragraph from "@/components/ui/text/Paragraph"

type SystemOverviewProps = {
    system: SystemResponse
    telemetry: TelemetryResponse | null
}

export default function System_Overview({ system, telemetry }: SystemOverviewProps) {
    const { dictionary } = useLanguage()

    const labels = dictionary.system.overview

    return (
        <div className="flex flex-col gap-3">
            <div>
                <Paragraph>
                    {labels.hostname}: {system.hostname}
                </Paragraph>
                <Paragraph>
                    {labels.operatingSystem}: {system.operating_system.name}{" "}
                    {system.operating_system.release}
                </Paragraph>
                <Paragraph>
                    {labels.osVersion}: {system.operating_system.version}
                </Paragraph>
                <Paragraph>
                    {labels.architecture}: {system.operating_system.architecture}
                </Paragraph>
            </div>

            <div>
                <Paragraph>
                    {labels.processor}: {system.cpu.name}
                </Paragraph>
                <Paragraph>
                    {labels.physicalCores}: {system.cpu.physical_cores}
                </Paragraph>
                <Paragraph>
                    {labels.logicalCores}: {system.cpu.logical_cores}
                </Paragraph>
                {telemetry && (
                    <Paragraph>
                        {labels.cpuUsage}: {telemetry.cpu_usage_percent}%
                    </Paragraph>
                )}
            </div>

            <div>
                <Paragraph>
                    {labels.totalMemory}: {formatBytes(system.memory.total_bytes)}
                </Paragraph>

                {telemetry && (
                    <>
                        <Paragraph>
                            {labels.usedMemory}: {formatBytes(telemetry.memory_used_bytes)}
                        </Paragraph>
                        <Paragraph>
                            {labels.availableMemory}:{" "}
                            {formatBytes(telemetry.memory_available_bytes)}
                        </Paragraph>
                        <Paragraph>
                            {labels.memoryUsage}: {telemetry.memory_usage_percent}%
                        </Paragraph>
                    </>
                )}
            </div>

            {telemetry && (
                <div>
                    <Paragraph>
                        {labels.uptime}: {formatDuration(telemetry.uptime_seconds)}
                    </Paragraph>
                </div>
            )}
        </div>
    )
}
