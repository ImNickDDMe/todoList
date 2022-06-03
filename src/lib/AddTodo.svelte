<script>
// @ts-nocheck
    import {
        Modal,
        Grid,
        Row,
        TextInput,
        TextArea,
        Form,
        Column
    } from 'carbon-components-svelte'
    import Send from 'carbon-icons-svelte/lib/Send.svelte'
    import { 
        openFirstModal, 
        user 
    } from '../stores'
    import { addDoc } from 'firebase/firestore'
    import { ongoingTodosRef } from '../firebaseConfig'

    const addTodo = async () => {
        const formData = Object.fromEntries(
            new FormData(
                document.getElementById('addTodoForm')
            ).entries()
        )

        const docRef = await addDoc(ongoingTodosRef, {
            todoName: formData.todoName,
            todoDescription: formData.todoDescription,
            dateCreated: new Date().toString(),
            createdBy: $user.uid,
            isCompleted: false
        })

        document.getElementById('addTodoForm').reset()
    }
</script>

<Modal 
    bind:open={$openFirstModal}
    modalHeading="Add To-do"
    primaryButtonText="Create"
    primaryButtonIcon={Send}
    secondaryButtonText="Cancel"
    on:submit={addTodo}
    on:close={() => document.getElementById('addTodoForm').reset()}
    on:click:button--primary={() => $openFirstModal = !$openFirstModal}
    on:click:button--secondary={() => $openFirstModal = !$openFirstModal}>
        <Grid fullWidth padding>
            <Column>
                <Row>
                    <Form id="addTodoForm">
                        <label for="todoName">
                            To-do Name
                        </label>
                        <TextInput name="todoName" />
                        <label for="todoDescription">
                            To-do Description
                        </label>
                        <TextArea name="todoDescription" />
                    </Form>
                </Row>
            </Column>
        </Grid>
</Modal>