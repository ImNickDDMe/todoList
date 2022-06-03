<script>
    import {
        Button,
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Grid,
        Column
    } from 'carbon-components-svelte'
    import { 
        openFirstModal, 
        selectedIndex, 
        ongoingTodos, 
        completedTodos,
    } from '../stores'
    import { 
        db,
        completedTodosRef
    } from '../firebaseConfig'
    import { 
        doc, 
        addDoc, 
        deleteDoc, 
        updateDoc, 
        getDoc
    } from 'firebase/firestore'

    const setToCompleted = async (todoId) => {
        const docRef = doc(db, 'ongoingTodos', todoId)

        await updateDoc(docRef, {
            isCompleted: true
        })

        const docSnapshot = await getDoc(docRef)
        await addDoc(completedTodosRef, {
            ...docSnapshot.data()
        })

        await deleteDoc(docRef)
    }
    
    const deleteOngoingTodo = async (todoId) => {
        await deleteDoc(doc(db, 'ongoingTodos', todoId))
    }

    const deleteCompletedTodo = async (todoId) => {
        await deleteDoc(doc(db, 'completedTodos', todoId))
    }
</script>

<DataTable
    expandable
    sortable
    headers={[
        { key: 'todoName', value: 'Name' },
        { key: 'dateCreated', value: 'Date Created' }
    ]}
    rows={$selectedIndex == 1 ? $completedTodos : $ongoingTodos}>
        <svelte:fragment slot="expanded-row" let:row>
            <Grid>
                <Column>
                    <p>{row.todoDescription}</p>
                </Column>
                {#if $selectedIndex == 0}
                    <Column>
                        <Button on:click={() => setToCompleted(row.id)}>
                            Set as completed
                        </Button>
                    </Column>
                {/if}
                {#if $selectedIndex == 0}
                    <Column>
                        <Button kind="danger" on:click={() => deleteOngoingTodo(row.id)}>
                            Delete To-do
                        </Button>
                    </Column>
                {:else}
                    <Column>
                        <Button kind="danger" on:click={() => deleteCompletedTodo(row.id)}>
                            Delete To-do
                        </Button>
                    </Column>
                {/if}
            </Grid>
        </svelte:fragment>
        <Toolbar>
            <ToolbarContent>
                <ToolbarSearch persistent shouldFilterRows />
                <Button on:click={() => $openFirstModal = !$openFirstModal}>
                    Add To-do
                </Button>
            </ToolbarContent>
        </Toolbar>
</DataTable>