import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { SpanService } from './span.service'

@Controller()
export class SpanController {
    constructor(private readonly spanService: SpanService) {}

    @Post('tracing/:app_id')
    trancing(@Param() { app_id }: { app_id: string }, @Body() body: { event_type: string; message: string }) {
        return this.spanService.trancing(app_id, body)
    }

    @Get('span')
    getSpan() {
        return this.spanService.getSpan()
    }

    @Get('bugs')
    bugs() {
        return this.spanService.bugs()
    }

    @Get('performance')
    performance() {
        return this.spanService.performance()
    }
}
