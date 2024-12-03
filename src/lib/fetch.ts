const FASTAPIURL = process.env.NEXT_PUBLIC_FASTAPIURL;

export const generateGroceriesList = async (data) => {
	try {
    const form = new FormData();
    
    form.append('text', data);
    console.log(form);

    const response = await fetch(FASTAPIURL + '/extract', {
      method: 'POST',
      body: form
    });

		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
