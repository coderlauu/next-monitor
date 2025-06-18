import { useQuery } from '@tanstack/react-query'
import { Copy, Package, Settings } from 'lucide-react'
import * as srv from '@/services'
import { toast } from 'sonner'
import copyText from 'copy-text-to-clipboard'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { lightFormat } from 'date-fns'
import type { CreateApplicationPayload } from '@/types/api'
import { appLogoMap } from './meta'
import { CreateProjectsModal } from './CreateProjectModal'

export function Projects() {
    const {
        data: applications,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            try {
                const res = await srv.fetchApplicationList()
                const allEvents = await fetch('/dsn-api/span')
                const allEventsData = await allEvents.json()

                return res.data.applications.map(app => {
                    // 错误
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const bugs = allEventsData.filter((event: any) => event.app_id === app.appId && event.event_type === 'error')
                    // 事务
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const transactions = allEventsData.filter((event: any) => event.app_id === app.appId && event.event_type !== 'error')
                    const data = new Array(7).fill(0).map((_, index) => ({
                        date: new Date(new Date().setDate(new Date().getDate() - index)).toISOString(),
                        resting: Math.floor(Math.random() * (100 - 20) + 20),
                    }))

                    return {
                        ...app,
                        bugs: bugs.length,
                        transactions: transactions.length,
                        data,
                    }
                })
            } catch (error) {
                console.error('queryFn 执行出错:', error) // 添加错误处理
                throw error
            }
        },
    })

    const removeApplication = async (appId: string) => {
        try {
            await srv.removeApplication(appId)
        } catch {
            toast.error('删除失败, 请稍后重试')
            return
        }
        toast.success('删除成功')
        refetch()
    }

    const createApplication = async (data: CreateApplicationPayload) => {
        try {
            await srv.createApplication(data)
        } catch {
            toast.error('创建失败, 请稍后重试')
            return false
        }
        toast.success('创建成功')
        refetch()
        return true
    }

    const copyAppId = (appId: string) => {
        toast.success('应用 ID 复制成功')
        copyText(appId)
    }

    const applicationContent = applications?.map?.((application, index) => (
        <div key={index} className="w-full">
            <Card className="shadow-none hover:drop-shadow-xl">
                <CardHeader className="w-full flex flex-row justify-between align-top">
                    <div className="flex items-center h-[48px]">
                        <img className="w-10 h-10 object-cover rounded-sm mr-3" src={appLogoMap[application.type]} alt="Project" />
                        <div className="flex flex-col justify-center gap-1 items-stretch h-full">
                            <CardTitle>
                                <Link to="/project/1" className="font-semibold text-sm">
                                    {application.name}
                                </Link>
                            </CardTitle>
                            <CardDescription className="text-xs">
                                缺陷：{application.bugs} | 事务：{application.transactions}
                            </CardDescription>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => removeApplication(application.appId)}>删除</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="p-0 bg-muted">
                    <ChartContainer
                        config={{
                            resting: {
                                label: 'Resting',
                                color: `hsl(var(--chart-${index + 1}))`,
                            },
                        }}
                        className="h-[150px] w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            margin={{
                                left: 14,
                                right: 14,
                                top: 10,
                            }}
                            data={application.data}
                        >
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="hsl(var(--muted-foreground))"
                                strokeOpacity={0.5}
                            />
                            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={value => {
                                    return new Date(value).toLocaleDateString('zh-CN', {
                                        weekday: 'short',
                                    })
                                }}
                            />
                            <Line
                                dataKey="resting"
                                type="natural"
                                fill="var(--color-resting)"
                                stroke="var(--color-resting)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    fill: 'var(--color-resting)',
                                    stroke: 'var(--color-resting)',
                                    r: 4,
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        labelFormatter={value => {
                                            return new Date(value).toLocaleDateString('zh-CN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                        }}
                                    />
                                }
                                cursor={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between pt-6 gap-2 w-full">
                    <p className="text-xs text-muted-foreground">创建时间：{lightFormat(application.createdAt, 'yyyy-MM-dd HH:mm:ss')}</p>
                    <Button variant="secondary" size="sm" onClick={() => copyAppId(application.appId)}>
                        <p className="text-xs text-left">应用 ID：{application.appId}</p>
                        <Copy className="h-4 w-4 ml-2" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    ))

    const emptyContent = (
        <div className="flex flex-col h-[calc(100vh-200px)] items-center justify-center space-y-4">
            <h1 className="text-xl font-semibold">暂无应用</h1>
            <p className="text-gray-500">当前没有任何应用，请添加新的内容来开始使用。</p>
            <CreateProjectsModal onCreateProject={createApplication} />
        </div>
    )

    const content = isLoading ? (
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">加载中...</p>
        </div>
    ) : applications?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{applicationContent}</div>
    ) : (
        emptyContent
    )

    return (
        <div className="flex-1 flex-col">
            <header className="flex items-center justify-between h-[36px] mb-4">
                <h1 className="flex flex-row items-center text-xl font-semibold">
                    <Package className="h-6 w-6 mr-2" />
                    项目总览
                </h1>
                <CreateProjectsModal onCreateProject={createApplication} />
            </header>

            {content}
        </div>
    )
}
