/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        this.PatternInit = []
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $("#Reset").on("click", $.proxy(this.resetButton, this))
        $("input:radio").on("click", $.proxy(this.resetButton, this))
        $("#Pattern").on("change", $.proxy(this.resetButton, this))
        $("#MoveForward").on("click", $.proxy(this.startStep, this))
        $("#Start").on("click", $.proxy(this.switchButtonStartStop, this))
        //$("#CurrentPattern > tbody").on("change", $.proxy(this.checkSameColor, this))

        console.log("Langton.onReady")
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $(".ant-x").text(this.Ant.X)
        $(".ant-y").text(this.Ant.Y)
        $(".ant-direction").text(this.Ant.Direction)
        $(".ant-nb-steps").text(this.Ant.NbSteps)
    }
    resetButton(){
        $("#Start").text("Start")
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
    }
    startStep(){
        for (let i = 0; i <= this.Simulation.Step; i++) {
            this.drawMove()
        }
    }
    switchButtonStartStop(){
        if($("#Start").text() == "Start") {
            $("#Start").text("Stop")
            this.startUntilEnd()
        }
        else{
            $("#Start").text("Start")
        }
        
    }
    startUntilEnd(){
        if (this.Grid.GetColor(this.Ant.X, this.Ant.Y) == null || $("#Start").text() == "Start"){
            return 
        }
        this.drawMove()
        setTimeout(() => this.startUntilEnd(), this.Simulation.Interval);
    }
    drawMove(){
        let colorAntCase = this.Grid.GetColor(this.Ant.X, this.Ant.Y)
        let paternList = this.getPatern()
        for(let i in paternList){
            let item = paternList[i]
            if(colorAntCase == item.if){
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, item.then.color)
                this.Ant.Turn(item.then.direction)
            }
        }
    }
    getCondition(row){
        let condition = {
            "if": row.data("if-color"),
            "then": {
                "color": row.children(".then-color").children("select").val(),
                "direction": row.children(".then-direction").children("select").val()
            }
        }
        return condition
    }
    getPatern(){
        let patern = []
        $("#CurrentPattern > tbody > tr").each((i, e) => {
            patern.push(this.getCondition($(e)))
        })
        this.PatternInit = patern
        return patern
    }
    checkSameColor(){
        $("#CurrentPattern > tbody > tr").each((i, e) => {
            
        })
    }
}

let langton = new Langton()
langton.RegisterOnReady()
