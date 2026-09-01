"use client"

import type { ProcessExplorerData, ProcessRefreshInterval } from "@/types/routes/processes"

import { useState } from "react"
import { PiArrowClockwiseDuotone, PiTimerDuotone } from "react-icons/pi"
import { useLanguage } from "@/i18n/Language_Context"
import { createProcessExplorerColumns } from "@/components/routes/processes/process_explorer/createProcessExplorerColumns"

import Table from "@/components/ui/tables/Table"
import Select from "@/components/ui/inputs/Select"
import Paragraph from "@/components/ui/text/Paragraph"
import Searchbar from "@/components/ui/inputs/Searchbar"
import Switcher from "@/components/ui/switchers/Switcher"
import Pagination from "@/components/ui/navigation/Pagination"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Process_Explorer_Props = {
    data: ProcessExplorerData
    autoRefresh: boolean
    onAutoRefreshChange: (enabled: boolean) => void
    refreshInterval: ProcessRefreshInterval
    onRefreshIntervalChange: (interval: ProcessRefreshInterval) => void
    canRefresh: boolean
    isRefreshing: boolean
    onRefresh: () => Promise<void>
    className?: string
}

const ALL_FILTER_VALUES = "__all__"
const UNAVAILABLE_USER_VALUE = "__unavailable__"

type CpuSortDirection = "cpu-desc" | "cpu-asc"

export default function Process_Explorer({
    data,
    autoRefresh,
    onAutoRefreshChange,
    refreshInterval,
    onRefreshIntervalChange,
    canRefresh,
    isRefreshing,
    onRefresh,
    className = "",
}: Process_Explorer_Props) {
    const { language, dictionary } = useLanguage()

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedState, setSelectedState] = useState(ALL_FILTER_VALUES)
    const [selectedUser, setSelectedUser] = useState(ALL_FILTER_VALUES)
    const [selectedVisibility, setSelectedVisibility] = useState(ALL_FILTER_VALUES)
    const [cpuSortDirection, setCpuSortDirection] = useState<CpuSortDirection>("cpu-desc")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const copy = dictionary.processes.processExplorer
    const common = dictionary.processes.common
    const locale = language === "de" ? "de-DE" : "en-GB"
    const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase(locale)

    const stateOptions = [
        { value: ALL_FILTER_VALUES, label: copy.filters.allStates },
        ...Array.from(
            new Set(
                data.rows
                    .map((process) => process.status)
                    .filter((status): status is NonNullable<typeof status> => status != null)
            )
        )
            .sort((a, b) => a.localeCompare(b, locale))
            .map((status) => ({ value: status, label: status.toLocaleUpperCase(locale) })),
    ]

    const availableUsers = Array.from(
        new Set(
            data.rows
                .map((process) => process.username)
                .filter((username): username is string => Boolean(username))
        )
    ).sort((a, b) => a.localeCompare(b, locale))

    const userOptions = [
        { value: ALL_FILTER_VALUES, label: copy.filters.allUsers },
        ...availableUsers.map((username) => ({ value: username, label: username })),
        ...(data.rows.some((process) => process.username === null)
            ? [{ value: UNAVAILABLE_USER_VALUE, label: common.unavailable }]
            : []),
    ]

    const visibilityOptions = [
        { value: ALL_FILTER_VALUES, label: copy.filters.allVisibility },
        ...Array.from(new Set(data.rows.map((process) => process.visibility)))
            .sort((a, b) => a.localeCompare(b, locale))
            .map((visibility) => ({
                value: visibility,
                label: visibility.toLocaleUpperCase(locale),
            })),
    ]

    const sortOptions = [
        { value: "cpu-desc", label: copy.controls.cpuDescending },
        { value: "cpu-asc", label: copy.controls.cpuAscending },
    ]

    const refreshIntervalOptions: {
        value: ProcessRefreshInterval
        label: string
    }[] = [
        { value: 2_000, label: "2s" },
        { value: 5_000, label: "5s" },
        { value: 10_000, label: "10s" },
        { value: 30_000, label: "30s" },
    ]

    const filteredRows = data.rows.filter((process) => {
        const matchesState = selectedState === ALL_FILTER_VALUES || process.status === selectedState
        const matchesUser =
            selectedUser === ALL_FILTER_VALUES ||
            (selectedUser === UNAVAILABLE_USER_VALUE
                ? process.username === null
                : process.username === selectedUser)
        const matchesVisibility =
            selectedVisibility === ALL_FILTER_VALUES || process.visibility === selectedVisibility

        const searchableValues = [process.name, process.username, process.pid, process.ppid]
        const matchesSearch =
            !normalizedSearchQuery ||
            searchableValues.some((value) =>
                String(value ?? "")
                    .toLocaleLowerCase(locale)
                    .includes(normalizedSearchQuery)
            )

        return matchesState && matchesUser && matchesVisibility && matchesSearch
    })

    const sortedRows = [...filteredRows].sort((firstProcess, secondProcess) => {
        const firstCpu = firstProcess.cpuPercent
        const secondCpu = secondProcess.cpuPercent

        if (firstCpu === null && secondCpu === null) return 0
        if (firstCpu === null) return 1
        if (secondCpu === null) return -1

        return cpuSortDirection === "cpu-desc" ? secondCpu - firstCpu : firstCpu - secondCpu
    })

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const visibleRows = sortedRows.slice(startIndex, endIndex)

    const columns = createProcessExplorerColumns({
        columns: copy.columns,
        language,
        unavailable: common.unavailable,
    })

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-3 pb-3 pt-2">
            <div className="flex min-h-0 flex-col">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <Searchbar
                            value={searchQuery}
                            onChange={(value) => {
                                setSearchQuery(value)
                                setPage(1)
                            }}
                            placeholder={copy.searchPlaceholder}
                            ariaLabel={copy.searchAriaLabel}
                            className="w-[280px] max-w-full"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Select
                            value={selectedState}
                            options={stateOptions}
                            onChange={(value) => {
                                setSelectedState(value)
                                setPage(1)
                            }}
                            ariaLabel={copy.columns.state}
                            className="min-w-[138px] [&>select]:w-full"
                        />
                        <Select
                            value={selectedUser}
                            options={userOptions}
                            onChange={(value) => {
                                setSelectedUser(value)
                                setPage(1)
                            }}
                            ariaLabel={copy.columns.user}
                            className="min-w-[138px] [&>select]:w-full"
                        />
                        <Select
                            value={selectedVisibility}
                            options={visibilityOptions}
                            onChange={(value) => {
                                setSelectedVisibility(value)
                                setPage(1)
                            }}
                            ariaLabel={copy.columns.visibility}
                            className="min-w-[158px] [&>select]:w-full"
                        />
                        <Select
                            value={cpuSortDirection}
                            options={sortOptions}
                            onChange={(value) => {
                                setCpuSortDirection(value as CpuSortDirection)
                                setPage(1)
                            }}
                            ariaLabel={copy.controls.sortAriaLabel}
                            className="ml-auto min-w-[150px] [&>select]:w-full"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Switcher
                            checked={autoRefresh}
                            onCheckedChange={onAutoRefreshChange}
                            ariaLabel={copy.controls.autoRefresh}
                            label={copy.controls.autoRefresh}
                            checkedColor="#22c55e"
                            uncheckedColor="#64748b"
                            thumbColor="#dbeafe"
                        />

                        <Select
                            value={refreshInterval}
                            options={refreshIntervalOptions}
                            onChange={(value) =>
                                onRefreshIntervalChange(Number(value) as ProcessRefreshInterval)
                            }
                            ariaLabel={copy.controls.refreshIntervalAriaLabel}
                            leadingIcon={<PiTimerDuotone className="size-4" />}
                            disabled={!autoRefresh}
                            className="w-[86px] [&>select]:w-full"
                        />

                        <button
                            type="button"
                            onClick={() => void onRefresh()}
                            disabled={!canRefresh || isRefreshing}
                            aria-busy={isRefreshing}
                            className="primary whitespace-nowrap"
                        >
                            <PiArrowClockwiseDuotone
                                aria-hidden="true"
                                className={isRefreshing ? "animate-spin" : ""}
                            />
                            {copy.controls.refreshNow}
                        </button>
                    </div>
                </div>

                <Table
                    ariaLabel={copy.title}
                    columns={columns}
                    rows={visibleRows}
                    getRowKey={(process) => process.pid}
                    tableClassName="min-w-[1120px] table-fixed"
                    emptyState={
                        <Paragraph className="paragraph_small muted_color">
                            {common.unavailable}
                        </Paragraph>
                    }
                />

                {sortedRows.length > 0 && (
                    <Pagination
                        page={page}
                        totalItems={sortedRows.length}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size)
                            setPage(1)
                        }}
                        showingLabel={copy.pagination.showing}
                        ofLabel={copy.pagination.of}
                        itemLabel={copy.pagination.processes}
                    />
                )}
            </div>
        </Section_Frame>
    )
}
