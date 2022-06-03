<script>
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelDivider,
        HeaderPanelLinks,
        HeaderPanelLink,
        SkipToContent
    } from 'carbon-components-svelte'
    import { UserAvatarFilledAlt } from 'carbon-icons-svelte'
    import {
        googleProvider,
        githubProvider
    } from '../loginProviders'
    import { auth } from '../firebaseConfig'
    import { 
        user,
        openSecondModal
    } from '../stores'
    import { 
        signOut,
        signInWithPopup
    } from 'firebase/auth'

    let isOpen = false

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => $user = result.user)
    }

    const loginWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => $user = result.user)
    }
</script>

<Header platformName="To-do List">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
        <HeaderAction 
            bind:isOpen
            icon={UserAvatarFilledAlt}
            closeIcon={UserAvatarFilledAlt}>
                <HeaderPanelLinks>
                    {#if $user == null}
                        <HeaderPanelLink on:click={loginWithGoogle}>
                            Login with Google
                        </HeaderPanelLink>
                        <HeaderPanelLink on:click={loginWithGithub}>
                            Login with Github
                        </HeaderPanelLink>
                    {:else}
                        <HeaderPanelLink on:click={() => $openSecondModal = !$openSecondModal}>
                            Delete Account
                        </HeaderPanelLink>
                        <HeaderPanelDivider></HeaderPanelDivider>
                        <HeaderPanelLink on:click={async () => await signOut(auth)}>
                            Logout
                        </HeaderPanelLink>
                    {/if}
                </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>