<template>
    <div>
        <footer id="footer">
            <div id="copyright">
                <p>@POWERED BY Imti-Damon COPYRIGHT &COPY; {{cYear}}</p>
                <div class="icons">
                    <a href="https://github.com/Imtiyaaz-D" target="_blank"><i class="bi bi-github"></i></a>
                <a href="https://www.linkedin.com/feed/" target="_blank"><i class="bi bi-linkedin"></i></a>
                <a href="https://www.instagram.com/imtiyaazdamon/" target="_blank"><i class="bi bi-instagram"></i></a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                cYear: new Date().getUTCFullYear()
            }
        }
    }
</script>

<style scoped>

.bi:hover {
    color: blue;
}

.bi {

    font-size: 1.8rem;
    margin: 0.5rem;
    color: black;
}
</style>