/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class codeEditorState{
    constructor(
        readonly content:string,
        readonly cursorPosition:number,
        readonly unsavedChanges: boolean
    ){}
    showState(){
        console.log(`
            Content: ${this.content}
            Cursor Position: ${this.cursorPosition}
            UnsavedChanges: ${this.unsavedChanges}
            `);
    }
    toCopy({content,cursorPosition,unsavedChanges}: Partial<codeEditorState>): codeEditorState{
        return new codeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        )
    }
}

class CodeEditorHistory {
    private history: codeEditorState[] = []
    private currentIndex = -1
    save(state:codeEditorState){
        if (this.currentIndex < this.history.length - 1) {
            this.history.slice(0, this.currentIndex + 1)
        }
        this.history.push(state)
        this.currentIndex++
    }
    undo(): codeEditorState|null{ // 0,1,2,3,4,5
        if (this.currentIndex > 0) {
            this.currentIndex--
            return this.history[this.currentIndex]
        }
        return null
    }
    redo():codeEditorState|null{
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++
            return this.history[this.currentIndex]
        }
        return null
    }
}

function main(){
    const history = new CodeEditorHistory()
    let state = new codeEditorState(`console.log('hola')`,1,false)
    history.save(state)
    state.showState()

    state = state.toCopy({
        content: `console.log('hola'); console.log('adios');`,
        cursorPosition:2,
        unsavedChanges:true
    })
    history.save(state)
    state.showState()

    state = state.toCopy({
        cursorPosition:3,
    })
    history.save(state)
    state.showState()

    state = history.undo()!
    state.showState()

    state = history.redo()!
    history.save(state)
    state.showState()
}
main()