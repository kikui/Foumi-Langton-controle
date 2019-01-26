
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }
    get Step(){
        return $("#NbSteps").val()
    }
    get Interval(){
        return $("#Interval").val()
    }
}
