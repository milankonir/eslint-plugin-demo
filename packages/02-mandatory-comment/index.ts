/**
 * All telemetry events must extend this class
 */
abstract class TelemetryEvent<Data extends Record<string, unknown>> {
  constructor(public readonly data: Data) {}
}

function sendTelemetryEvent<T extends TelemetryEvent<Data>, Data extends Record<string, unknown>>(event: T) {
  // Send telemetry event to sink
}

class ViewDetailsClicked extends TelemetryEvent<{}> {}
