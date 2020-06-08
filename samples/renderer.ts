import { Fun, Unit } from "../lib/core"
import { State, unitState, repeatState } from "../lib/state"
import { Pair } from "../lib/pair"

export default function(size: number) : Unit {
  console.log('\n --- render sample')

  type RenderingBuffer = string
  type Renderer = State<RenderingBuffer, Unit>

  const renderNothing : Renderer = unitState<RenderingBuffer, Unit>().f({})
  const renderString = (x: string) : Renderer => State( (s) => Pair({}, s + x))

  const renderAsterisk  = renderString('*')
  const renderSpace     = renderString(" ")
  const renderNewLine   = renderString("\n")

  const renderLine = (n: number) : Renderer =>
    repeatState<RenderingBuffer,Unit>(n, (_:Unit) => renderAsterisk.bind(_ => renderSpace))({})

  const renderSquare = (n: number) : Renderer =>
    repeatState<RenderingBuffer,Unit>(n,
      (_:Unit) => renderLine(n)
        .bind((_:Unit) => renderNewLine)
    )({})

  const renderThatSquare = renderSquare(size).f("")
  console.log(renderThatSquare.snd)

  return {}
}
