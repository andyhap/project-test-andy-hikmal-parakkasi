// app/api/ideas/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  try {
    const apiUrl = new URL('https://suitmedia-backend.suitdev.com/api/ideas');
    
    // Salin semua parameter
    searchParams.forEach((value, key) => {
      apiUrl.searchParams.append(key, value);
    });
    
    const res = await fetch(apiUrl.toString());
    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}