$(document).ready(() => {
	$('.delete_cat').on('click', (e) => {
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/manage/categories/delete/'+id,
			success: (response) => {
				alert('Delete category');
				window.location.href = '/manage/categories'
			},
			error: (error) => {
				console.log(error);
			}
		})
	});

	$('.delete_article').on('click', (e) => {
		$target = $(e.target);
		const id = $target.attr('data-item');
		$.ajax({
			type: 'DELETE',
			url: '/manage/articles/delete/'+id,
			success: (response) => {
				alert('Delete article');
				window.location.href = '/manage/articles'
			},
			error: (error) => {
				console.log(error);
			}
		})
	});
});