<template>
    <div class="gallery">
        <div class="images">
            <div class="list" v-if="images && images.length">
                <div v-for="image in images" class="group">
                    <div class="item">
                        <img :src="image.src" />
                    </div>
                    <div class="link">
                        <input type="text" :value="'![' + image.description + '](safe://' + (image.src) + ')'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="uploader">
            <form class="default" ref="form" @submit="uploadImage">
                <h4>Image Gallery</h4>
                <p>The input beneath each image contains Markdown you can copy and paste in to your post to display the image.</p>
                <label for="image">Image</label>
                <input type="file" accept="image/*" id="image" ref="image" />
                <label for="description">Description</label>
                <input type="text" placeholder="A description for this image" id="description" ref="description" />
                <input type="submit" value="Upload" />
            </form>
        </div>
        <div class="close" @click="this.close">&times;</div>
    </div>
</template>

<script>
    import api from '@/service/safe/api';

    export default {
        name: 'Gallery',
        props: {
            close: Function
        },
        data() {
            return {
                images: false,
                formData: {

                }
            }
        },
        methods: {
            load: function() {
                let parent = this;
                api.getGenericDocuments(this.$root.$data.domain, "images").then(images => {
                    parent.images = images;
                });
            },
            uploadImage: function(event) {
                event.preventDefault();
                event.stopPropagation();

                let parent = this,
                    reader = new FileReader(),
                    file = this.$refs.image.files[0],
                    description = this.$refs.description.value;
                reader.readAsArrayBuffer(file);

                reader.onload = function (evt) {
                    let fileName = "images/" + Math.random().toString(36).substr(2, 10) + file.name.split('.').pop();

                    api.updateRawFile(evt.target.result, parent.$root.$data.domain, fileName, false).then(result => {
                        let image = {
                            src: parent.$root.$data.domain.replace(/\/$/) + "/" + fileName,
                            mime: file.type,
                            description: description
                        };

                        api.addGenericDocument(parent.$root.$data.domain, image, "images").then(_ => {
                            parent.load();
                            parent.$refs.form.reset();
                        });
                    })
                };

                reader.onerror = function (evt) {
                    alert("Unable to read file from local file system");
                };
            }
        },
        mounted() {
            this.load()
        }
    }
</script>

<style scoped lang="scss">
    .gallery {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #f2f5f6;
        z-index: 50;

        .close {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 24px;
            font-weight: bold;
            opacity: .8;
            cursor: pointer;
            z-index: 100;

            &:hover {
                opacity: 1;
            }
        }

        .images {
            width: 80vw;
            padding: 20px;

            .list {
                padding: 20px 20px 0 20px;
                background-color: #fff;

                .group {
                    display: inline-block;
                    vertical-align: top;
                    width: 200px;
                    margin: 0 20px 20px 0;
                    overflow: hidden;

                    .item {
                        width: 200px;
                        height: 200px;
                        border: 2px solid #2d6cad;
                        overflow: hidden;
                    }

                    img {
                        width: 100%;
                    }

                    input {
                        width: 100%;
                        margin-top: 10px;
                        padding: 5px;
                    }
                }
            }
        }

        .uploader {
            position: fixed;
            left: 80vw;
            top: 0;
            width: 20vw;
            height: 100vh;
            padding: 20px;
            background-color: #fff;
            z-index: 99;

            form.default {
                width: 100%;
                margin: 0;
                padding: 0;

                input[type="file"] {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>