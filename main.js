class Command {
  execute() {
    throw new Error("Class must be extended with execute() defined");
  }
}

class DrawCommand extends Command {
  constructor(point) {
    super();
    // mouse coordinates
    // {x: int, y: int}
    this.command = "DRAW";
    this.path = [point];
  }

  execute(ctx) {
    this.path.forEach((point) => {
      renderPoint(ctx, point);
    });
  }
}

class LoadCommand extends Command {
  constructor(state, canvasDimensions) {
    super();
    this.command = "LOAD";
    this.state = state;
    this.canvasDimensions = canvasDimensions;
  }

  execute(ctx) {
    ctx.clearRect(
      0,
      0,
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );
    ctx.putImageData(this.state, 0, 0);
  }
}

const renderPoint = (ctx, point) => {
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  ctx.beginPath();

  ctx.moveTo(point.x, point.y);
};

const main = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineWidth = 2;

  let drawing = false;
  let commands = [];
  let redoCommands = [];
  let currentCommand;
  let state;

  const startDrawing = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const command = new DrawCommand({ x, y });

    currentCommand = command;
    redoCommands = [];

    drawing = true;
    draw(e);
  };

  const draw = (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;
    currentCommand.path.push({ x, y });
    renderPoint(ctx, { x, y });
  };

  const finishDrawing = () => {
    drawing = false;
    ctx.beginPath();

    commands.push(currentCommand);
    currentCommand = null;
  };

  const undo = () => {
    if (commands.length === 0) return;

    redoCommands.push(commands.pop());
    redraw();
  };

  const redo = () => {
    if (redoCommands.length === 0) return;
    commands.push(redoCommands.pop());

    redraw();
  };

  const redraw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    commands.forEach((command) => {
      command.execute(ctx);
      ctx.beginPath();
    });
  };

  const save = () => {
    state = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const load = () => {
    if (state) {
      const command = new LoadCommand(state, {
        width: canvas.width,
        height: canvas.height,
      });

      commands.push(command);
      command.execute(ctx);
    }else{
        console.error("You haven't saved!")
    }
  };

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", finishDrawing);
  document.getElementById("undo").addEventListener("click", undo);
  document.getElementById("redo").addEventListener("click", redo);
  document.getElementById("save").addEventListener("click", save);
  document.getElementById("load").addEventListener("click", load);
};

main();
