const FASTAPIURL = process.env.NEXT_PUBLIC_FASTAPIURL;

export const generateGroceriesList = async (data: any) => {
	try {
    const form = new FormData();

    if(data.text) {
      form.append('text', data.text);
    }

    if(data.files) {
      for(let file of data.files)
      {
        form.append('files', file);
      }
    }

    const response = await fetch(FASTAPIURL + '/extract', {
      method: 'POST',
      body: form
    });

    return await response.json();
	} catch (err) {
		console.log(err);
	}
};
