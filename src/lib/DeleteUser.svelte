<script>
    import {
        Modal,
        Grid,
        Row,
        Column
    } from 'carbon-components-svelte'
    import { 
        user, 
        openSecondModal
    } from '../stores'
    import { Send } from 'carbon-icons-svelte'
    import { deleteUser } from 'firebase/auth'

    const handleSubmit = async () => {
        await deleteUser($user)
    }
</script>

<Modal
    bind:open={$openSecondModal}
    danger
    modalHeading="Delete User"
    primaryButtonText="Delete"
    primaryButtonIcon={Send}
    secondaryButtonText="Cancel"
    on:submit={handleSubmit}
    on:click:button--primary={() => $openSecondModal = !$openSecondModal}
    on:click:button--secondary={() => $openSecondModal = !$openSecondModal}>
        <Grid fullWidth padding>
            <Row>
                <Column>
                    <p>You are about to delete your account.</p>
                </Column>
            </Row>
        </Grid>
</Modal>