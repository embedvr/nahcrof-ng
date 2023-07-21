<script>
    import { page } from '$app/stores';
    import '../app.css';
    console.log($page.error);
</script>

<img src={`https://http.cat/${$page.status}`} alt={`${$page.status}: ${$page.error?.message}`} />