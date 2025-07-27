document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const photo = document.getElementById('photo').files[0];
  const description = form.description.value;
  const discord_tag = form.discord_tag.value;

  const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value);

  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('description', description);
  formData.append('discord_tag', discord_tag);
  formData.append('tags', JSON.stringify(tags));

  const res = await fetch('https://YOUR_BACKEND_URL/upload', {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  document.getElementById('status').innerText = result.message || 'Upload voltooid!';
});
