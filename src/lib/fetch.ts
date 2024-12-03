import { GroceryList } from "@/types";

const FASTAPIURL = process.env.NEXT_PUBLIC_FASTAPIURL;

export const generateGroceriesList = async (data) => {
	try {
    console.log(data);
    const form = new FormData();
    
    form.append('text', data);

    console.log(FASTAPIURL);

    const response = await fetch(FASTAPIURL + '/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: form
    });

		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
