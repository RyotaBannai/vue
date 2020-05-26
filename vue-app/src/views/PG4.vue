<template>
    <div>
        <tree-folder :folder="finder"></tree-folder>
    </div>
</template>

<script>
    import TreeFolder from "../components/recursives/TreeFolder";
    export default {
        name: "PG4",
        components: {TreeFolder},
        data () {
            return {
                finder: {
                    name: 'root',
                    is_folder: true,
                    children: [
                        {
                            name: 'text.txt',
                            is_folder: false,
                        },
                        {
                            name: 'Desktop',
                            is_folder: true,
                            children: [],
                        },
                        {
                            name: 'Downloads',
                            is_folder: true,
                            children: [
                                {
                                    name: 'media.mp4',
                                    is_folder: false
                                },
                                {
                                    name: 'screenshot.jpg',
                                    is_folder: false
                                }
                            ]
                        },
                        {
                            name: 'Document',
                            is_folder: true,
                            children: [
                                {
                                    name: 'Docs',
                                    is_folder: true,
                                    children: [
                                        {
                                            name: 'important.txt',
                                            is_folder: false,
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
            }
        }
    }

</script>

<style scoped>

</style>